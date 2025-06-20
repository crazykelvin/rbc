// abTester.js

export function getUserVariant(testName = 'ab-test') {
  const stored = localStorage.getItem(testName);
  if (stored) return stored;

  const variant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(testName, variant);
  return variant;
}

export function getSegment() {
  const params = new URLSearchParams(window.location.search);
  return params.get('segment') || 'default';
}

export function applyHeroContent({ variant, segment }) {
  const heading = document.querySelector('#hero-heading');
  const cta = document.querySelector('#cta-button');

  if (!heading || !cta) return;

  const personalized = {
    student: {
      heading: 'Exclusive Benefits for Students!',
      cta: 'Get Started',
    },
    default: {
      heading: 'Welcome to RBC!',
      cta: 'Learn More',
    },
  };

  const content = personalized[segment] || personalized.default;

  if (variant === 'B') {
    heading.textContent = content.heading;
    cta.textContent = content.cta;
  } else {
    heading.textContent = 'Discover the RBC Rewards+ Visa Card';
    cta.textContent = 'Apply Now';
  }
}

