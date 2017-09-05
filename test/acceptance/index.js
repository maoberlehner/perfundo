import { ClientFunction, Selector } from 'testcafe';

fixture(`Index`).page(`http://localhost:1337/`);

test(`The hero section is visible.`, async (t) => {
  const heroSection = Selector(`.c-hero`);

  await t.expect(heroSection.exists).ok();
});

test(`Click on hero image opens lightbox.`, async (t) => {
  const heroImageLink = Selector(`.c-hero .perfundo__link`);
  const heroImageOverlay = Selector(`.c-hero .perfundo__overlay`);

  await t
    .expect(heroImageOverlay.visible)
    .notOk()
    .click(heroImageLink)
    .expect(heroImageOverlay.visible)
    .ok();
});

test(`Click on CSS only gallery image opens lightbox.`, async (t) => {
  const getLocationHref = ClientFunction(() => window.location.href);
  const galleryFirstImageLink = Selector(`.perfundo__link[href="#perfundo-img1"]`);
  const galleryFirstImageOverlay = Selector(`#perfundo-img1`);

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
  const galleryFirstImageLink = Selector(`.perfundo__link[href="#perfundo-img1"]`);
  const galleryFirstImageNextLink = Selector(`.perfundo__next[href="#perfundo-img2"]`);
  const galleryFirstImageOverlay = Selector(`#perfundo-img1`);
  const gallerySecondImageNextLink = Selector(`.perfundo__next[href="#perfundo-img3"]`);
  const gallerySecondImageOverlay = Selector(`#perfundo-img2`);
  const galleryThirdImagePrevLink = Selector(`.perfundo__prev[href="#perfundo-img2"]`);
  const galleryThirdImageOverlay = Selector(`#perfundo-img3`);

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
  const galleryFirstImageLink = Selector(`.perfundo__link[href="#perfundo-js-img1"]`);
  const galleryFirstImageOverlay = Selector(`#perfundo-js-img1`);

  await t
    .expect(galleryFirstImageOverlay.visible)
    .notOk()
    .click(galleryFirstImageLink)
    .expect(galleryFirstImageOverlay.visible)
    .ok()
    .expect(getLocationHref())
    .notContains(`#`);
});
