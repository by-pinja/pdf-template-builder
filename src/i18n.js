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
          showPreview: 'Show preview'
        }
      },
      fi: {
        translation: {
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
          showPreview: 'Näytä esikatselu'
        }
      }
    }
  });
