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
          group: 'Group',
          text: 'Text',
          image: 'Image',
          bold: 'Bold',
          italic: 'Italic',
          underline: 'Underline',
          color: 'Color',
          alignLeft: 'Align left',
          alignRight: 'Align right',
          alignCenter: 'Align center',
          alignTop: 'Align top',
          alignMiddle: 'Align middle',
          alignBottom: 'Align bottom',
          content: 'Content',
          commonProperties: 'Common properties',
          freeText: 'Free text',
          bindToProperty: 'Bind to property',
          layoutRelative: 'Use relative layout',
          deleteThisElement: 'Delete this {{type}}',
          elementSettings: '{{type}} settings',
          pageSettings: 'Page settings',
          addElement: 'Add element',
          showPreview: 'Show preview',
          doRedo: 'Redo',
          doUndo: 'Undo',
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
          group: 'Ryhmä',
          text: 'Teksti',
          image: 'Kuva',
          bold: 'Lihavoi',
          italic: 'Kursivoi',
          underline: 'Alleviivaa',
          color: 'Väri',
          alignLeft: 'Tasaa vasemmalle',
          alignRight: 'Tasaa oikealle',
          alignCenter: 'Tasaa keskelle',
          alignTop: 'Tasaa ylös',
          alignMiddle: 'Tasaa keskelle',
          alignBottom: 'Tasaa alas',
          content: 'Sisältö',
          commonProperties: 'Yleiset arvot',
          freeText: 'Vapaa teksti',
          bindToProperty: 'Sido arvo',
          layoutRelative: 'Asettele suhteellisesti',
          deleteThisElement: 'Poista {{type}}',
          elementSettings: '{{type}}n asetukset',
          pageSettings: 'Sivun asetukset',
          addElement: 'Lisää elementti',
          showPreview: 'Näytä esikatselu',
          doRedo: 'Tee uudelleen',
          doUndo: 'Kumoa',
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
