/* The Pool Crew — interactions */
(function () {
  'use strict';

  /* ---------- sticky header shadow ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) closeNav();
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id], #top')
  );
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));

  function setActive() {
    var pos = window.scrollY + 140;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ---------- FAQ: one open at a time ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- quote form ---------- */
  var form = document.getElementById('quote-form');
  var status = document.getElementById('form-status');

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;

      var name = form.elements.name;
      var phone = form.elements.phone;
      var email = form.elements.email;
      var city = form.elements.city;
      var service = form.elements.service;
      var message = form.elements.message;

      [name, phone, email].forEach(function (f) { f.classList.remove('is-invalid'); });

      var errors = [];
      if (!name.value.trim()) { name.classList.add('is-invalid'); errors.push('your name'); }
      if (phone.value.replace(/\D/g, '').length < 10) { phone.classList.add('is-invalid'); errors.push('a valid phone number'); }
      if (email.value.trim() && !validEmail(email.value.trim())) { email.classList.add('is-invalid'); errors.push('a valid email'); }

      if (errors.length) {
        status.textContent = 'Please add ' + errors.join(', ') + '.';
        status.className = 'form-status is-err';
        return;
      }

      var subject = 'Free quote request - ' + service.value + ' - ' + city.value;
      var body =
        'Name: ' + name.value.trim() + '\n' +
        'Phone: ' + phone.value.trim() + '\n' +
        'Email: ' + (email.value.trim() || 'Not provided') + '\n' +
        'City: ' + city.value + '\n' +
        'Service needed: ' + service.value + '\n\n' +
        'About the pool:\n' + (message.value.trim() || 'Not provided');

      status.textContent = 'Thanks ' + name.value.trim().split(' ')[0] +
        '! Your email app is opening with the details. Prefer to talk now? Call (214) 304-9480.';
      status.className = 'form-status is-ok';

      window.location.href =
        'mailto:michael@mypoolcrew.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- current year in footer copyright (kept static text fallback) ---------- */
  var yearHolder = document.querySelector('.footer__bottom p');
  if (yearHolder) {
    var year = new Date().getFullYear();
    yearHolder.textContent = 'Copyright ' + year + ' The Pool Crew. All rights reserved.';
  }
})();
