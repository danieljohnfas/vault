// Run: node --test 'scripts/test/*.test.mjs'
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { hostKey, toHomepage, registrableDomain, isTopical, domainsFromCertificates, pool } = require('../lib/discovery.js');

test('deep links reduce to the site homepage', () => {
  assert.equal(toHomepage('https://www.Example.com/gallery/123?x=1#y'), 'https://www.example.com/');
  assert.equal(toHomepage('http://site.net/a/b'), 'http://site.net/');
  for (const bad of ['mailto:a@b.c', 'javascript:void(0)', 'https://localhost/x', 'http://192.168.0.1/', 'not a url']) {
    assert.equal(toHomepage(bad), null, bad);
  }
});

test('hosts de-duplicate across www./m. variants', () => {
  assert.equal(hostKey('https://www.nhentai.net/g/1'), 'nhentai.net');
  assert.equal(hostKey('https://m.nhentai.net'), 'nhentai.net');
  assert.equal(hostKey('https://sukebei.nyaa.si/'), 'sukebei.nyaa.si');
});

test('registrable domain handles common two-part suffixes', () => {
  assert.equal(registrableDomain('cdn.assets.hentaisite.com'), 'hentaisite.com');
  assert.equal(registrableDomain('www.doujin.co.uk'), 'doujin.co.uk');
  assert.equal(registrableDomain('mangas.com.br'), 'mangas.com.br');
  assert.equal(registrableDomain('com'), null);
});

test('topic check keeps adult/anime sites and drops off-topic ones', () => {
  for (const t of ['nhentai.net', 'Gelbooru anime images', 'Free XXX cams', 'Read manga online', 'エロ同人', 'Rule 34', 'Visual Novel Database']) {
    assert.equal(isTopical(t), true, t);
  }
  for (const t of ['Video Game News, Reviews, and Walkthroughs - IGN', 'Eurogamer.net', 'Cambodia Tourist Service', 'Oak City Headlight Restoration', 'jsDelivr CDN']) {
    assert.equal(isTopical(t), false, t);
  }
});

test('certificate logs yield recent, on-topic registrable domains', () => {
  const now = Date.parse('2026-10-01T00:00:00Z');
  const entries = [
    { not_before: '2026-09-28T00:00:00', name_value: 'newhentai.com\nwww.newhentai.com\n*.newhentai.com' },
    { not_before: '2026-09-29T00:00:00', name_value: 'mail.doujinhub.co.uk' },
    { not_before: '2026-09-29T00:00:00', name_value: 'cdn.example.com' },
    { not_before: '2025-01-01T00:00:00', name_value: 'oldhentai.net' },
    { not_before: 'garbage', name_value: 'brokenhentai.net' },
  ];
  assert.deepEqual(domainsFromCertificates(entries, { keywords: ['hentai', 'doujin'], sinceDays: 14, now }).sort(),
    ['doujinhub.co.uk', 'newhentai.com']);
  assert.deepEqual(domainsFromCertificates(null, { keywords: ['hentai'] }), []);
});

test('pool runs everything with bounded concurrency', async () => {
  let active = 0, peak = 0; const seen = [];
  await pool([...Array(25).keys()], 4, async i => {
    active++; peak = Math.max(peak, active);
    await new Promise(r => setTimeout(r, 2)); seen.push(i); active--;
  });
  assert.equal(seen.length, 25);
  assert.ok(peak <= 4);
});
