import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('introduces Osaroekaa as a frontend developer', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { level: 1, name: /i build useful things for the web/i })
  ).not.toBeNull();
  expect(screen.getAllByText(/frontend developer/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: 'Home' }).className).toContain('active');
  expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBe('location');
});

test('keeps the clicked navigation item active while scrolling to its section', () => {
  const sectionBounds = {
    home: { top: 0, bottom: 600 },
    projects: { top: 700, bottom: 1250 },
    about: { top: 1300, bottom: 1900 },
    contact: { top: 2000, bottom: 2350 },
  };
  const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
  const originalScrollHeight = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'scrollHeight'
  );
  const unmount = render(<App />).unmount;

  try {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3000,
    });
    Object.entries(sectionBounds).forEach(([id, bounds]) => {
      jest.spyOn(document.getElementById(id), 'getBoundingClientRect').mockImplementation(() => {
        const currentBounds = sectionBounds[id];
        return {
          ...currentBounds,
          height: currentBounds.bottom - currentBounds.top,
          width: 100,
          left: 0,
          right: 100,
          x: 0,
          y: currentBounds.top,
          toJSON: () => ({}),
        };
      });
    });

    act(() => {
      fireEvent.scroll(window);
    });
    expect(screen.getByRole('link', { name: 'Home' }).className).toContain('active');

    const workLink = screen.getByRole('link', { name: 'Work' });
    fireEvent.click(workLink);
    expect(workLink.className).toContain('active');

    sectionBounds.projects = { top: 500, bottom: 1050 };
    sectionBounds.about = { top: 1100, bottom: 1700 };
    act(() => fireEvent.scroll(window));
    expect(workLink.className).toContain('active');

    sectionBounds.projects = { top: 100, bottom: 650 };
    act(() => fireEvent.scroll(window));
    expect(workLink.className).toContain('active');

    sectionBounds.projects = { top: -500, bottom: 50 };
    sectionBounds.about = { top: 100, bottom: 700 };
    act(() => fireEvent.scroll(window));
    expect(screen.getByRole('link', { name: 'About' }).className).toContain('active');
  } finally {
    unmount();
    HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    if (originalScrollHeight) {
      Object.defineProperty(document.documentElement, 'scrollHeight', originalScrollHeight);
    } else {
      delete document.documentElement.scrollHeight;
    }
  }
});

test('lists frontend tools without backend technologies in the toolbox', () => {
  render(<App />);

  const toolbox = screen.getByRole('heading', { name: /technologies i work with/i })
    .closest('.skills-panel');
  expect(within(toolbox).getByText('React')).not.toBeNull();
  expect(within(toolbox).queryByText('Prisma')).toBeNull();
  expect(within(toolbox).queryByText('PostgreSQL')).toBeNull();
});

test('shows project implementation details and source links', () => {
  render(<App />);

  const carMarketCard = screen.getByRole('article', { name: /carmarket/i });
  expect(within(carMarketCard).getByText(/Next\.js/)).not.toBeNull();
  expect(
    within(carMarketCard).getByRole('link', { name: /source code/i })
    .getAttribute('href')
  ).toBe('https://github.com/Osaroekaa/CarMarket');
});

test('provides a working CV download and email contact link', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /download my cv/i }).getAttribute('href')).toBe(
    '/Osaroekaa-Sampson-CV.docx'
  );
  expect(
    screen.getByRole('link', { name: /osaroekaasampson@gmail.com/i }).getAttribute('href')
  ).toBe('mailto:osaroekaasampson@gmail.com');
});
