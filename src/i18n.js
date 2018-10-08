import * as i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(reactI18nextModule)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          pdfTemplateBuilder: 'PDF template builder',
          common: {
            group: 'Group',
            text: 'Text',
            image: 'Image',
            bold: 'Bold',
            italic: 'Italic',
            underline: 'Underline',
            color: 'Color',
            align: {
              left: 'Align left',
              right: 'Align right',
              center: 'Align center',
              top: 'Align top',
              middle: 'Align middle',
              bottom: 'Align bottom'
            },
            content: 'Content'
          },
          freeText: 'Free text',
          bindToProperty: 'Bind to property',
          layoutRelative: 'Use relative layout',
          deleteThisElement: 'Delete this {{type}}',
          elementSettings: '{{type}} settings',
          pageSettings: 'Page settings',
          addElement: 'Add element',
          showPreview: 'Show preview',
          doRedo: 'Redo',
          doSave: 'Save',
          sizeAndOrientation: 'Size and orientation',
          paperSize: 'Paper format',
          paperOrientation: 'Orientation',
          landscape: 'Landscape',
          portrait: 'Portrait',
          showGrid: 'Show grid',
          hideGrid: 'Hide grid'
        }
      },
      fi: {
        translation: {
          pdfTemplateBuilder: 'PDF-pohjien rakennustyökalu',
          common: {
            group: 'Ryhmä',
            text: 'Teksti',
            image: 'Kuva',
            bold: 'Lihavoi',
            italic: 'Kursivoi',
            underline: 'Alleviivaa',
            color: 'Väri',
            align: {
              left: 'Tasaa vasemmalle',
              right: 'Tasaa oikealle',
              center: 'Tasaa keskelle',
              top: 'Tasaa ylös',
              middle: 'Tasaa keskelle',
              bottom: 'Tasaa alas'
            },
            content: 'Sisältö'
          },
          freeText: 'Vapaa teksti',
          bindToProperty: 'Sido arvo',
          layoutRelative: 'Asettele suhteellisesti',
          deleteThisElement: 'Poista {{type}}',
          elementSettings: '{{type}}n asetukset',
          pageSettings: 'Sivun asetukset',
          addElement: 'Lisää elementti',
          showPreview: 'Näytä esikatselu',
          doRedo: 'Tee uudelleen',
          doSave: 'Tallenna',
          sizeAndOrientation: 'Koko ja asettelu',
          paperSize: 'Paperin koko',
          paperOrientation: 'Sivun asettelu',
          landscape: 'Vaaka',
          portrait: 'Pysty',
          showGrid: 'Näytä ruudukko',
          hideGrid: 'Piilota ruudukko'
        }
      }
    }
  });
