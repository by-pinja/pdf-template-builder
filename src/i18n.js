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
            image: 'Image'
          }
        }
      },
      fi: {
        translation: {
          common: {
            group: 'Ryhmä',
            text: 'Teksti',
            image: 'Kuva'
          }
        }
      }
    }
  });
