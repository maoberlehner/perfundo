import { ClientFunction, Selector } from 'testcafe';

fixture(`Index`).page(`http://localhost:1337/`);

test(`The hero section is visible.`, async (t) => {
  const heroSection = Selector(`.qa-hero`);

  await t.expect(heroSection.exists).ok();
});

test(`Click on hero image opens lightbox.`, async (t) => {
  const heroImageLink = Selector(`.qa-hero-link`);
  const heroImageOverlay = Selector(`.qa-hero-overlay`);

  await t
    .expect(heroImageOverlay.visible)
    .notOk()
    .click(heroImageLink)
    .expect(heroImageOverlay.visible)
    .ok();
});

test(`Click on CSS only gallery image opens lightbox.`, async (t) => {
  const getLocationHref = ClientFunction(() => window.location.href);
  const galleryFirstImageLink = Selector(`.qa-link-img1`);
  const galleryFirstImageOverlay = Selector(`.qa-overlay-img1`);

  await t
    .expect(galleryFirstImageOverlay.visible)
    .notOk()
    .click(galleryFirstImageLink)
    .expect(galleryFirstImageOverlay.visible)
    .ok()
    .expect(getLocationHref())
    .contains(`#perfundo-img1`);
});

test(`Click on CSS only gallery prev and next opens correct overlays.`, async (t) => {
  const galleryFirstImageLink = Selector(`.qa-link-img1`);
  const galleryFirstImageNextLink = Selector(`.qa-next-img1`);
  const galleryFirstImageOverlay = Selector(`.qa-overlay-img1`);
  const gallerySecondImageNextLink = Selector(`.qa-next-img2`);
  const gallerySecondImageOverlay = Selector(`.qa-overlay-img2`);
  const galleryThirdImagePrevLink = Selector(`.qa-prev-img3`);
  const galleryThirdImageOverlay = Selector(`.qa-overlay-img3`);

  await t
    .click(galleryFirstImageLink)
    .expect(galleryFirstImageOverlay.visible)
    .ok()
    .click(galleryFirstImageNextLink)
    .expect(galleryFirstImageOverlay.visible)
    .notOk()
    .expect(gallerySecondImageOverlay.visible)
    .ok()
    .click(gallerySecondImageNextLink)
    .expect(gallerySecondImageOverlay.visible)
    .notOk()
    .expect(galleryThirdImageOverlay.visible)
    .ok()
    .click(galleryThirdImagePrevLink)
    .expect(galleryThirdImageOverlay.visible)
    .notOk()
    .expect(gallerySecondImageOverlay.visible)
    .ok();
});

test(`Click on JavaScript gallery image doesn't affect history.`, async (t) => {
  const getLocationHref = ClientFunction(() => window.location.href);
  const galleryFirstImageLink = Selector(`.qa-js-link-img1`);
  const galleryFirstImageOverlay = Selector(`.qa-js-overlay-img1`);

  await t
    .expect(galleryFirstImageOverlay.visible)
    .notOk()
    .click(galleryFirstImageLink)
    .expect(galleryFirstImageOverlay.visible)
    .ok()
    .expect(getLocationHref())
    .notContains(`#`);
});
