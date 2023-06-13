import React, { FC } from 'react';
import {
  ContactsCallIcon,
  ContactsEmailIcon,
  ContactsFaxIcon,
  ContactsLocationIcon, Container, DefaultMap,
  DefaultTitle
} from "../_components";
import { v4 as uuid } from 'uuid'
import { useTranslation } from "react-i18next";

interface ContactsProps {

}

const contactsFeatures = [
  {
    id: uuid(),
    title: 'auth_data.address',
    text: 'contacts.address-text',
    image: <ContactsLocationIcon className="contact_svg"/>
  },
  {
    id: uuid(),
    title: 'auth_data.phone',
    text: '+7 (495) 384-66-76',
    image: <ContactsCallIcon className="contact_svg"/>
  },
  { id: uuid(), title: 'contacts.fax', text: '+7 (495) 384-66-76', image: <ContactsFaxIcon className="contact_svg"/> },
  {
    id: uuid(),
    title: 'contacts.email',
    text: 'teaberry@gmail.com',
    image: <ContactsEmailIcon className="contact_svg"/>
  },
]

const Contacts: FC<ContactsProps> = ({}) => {
  const { t } = useTranslation()

  return (

    <div className="contacts">
      <Container>
        <DefaultTitle className="contacts__title">{t('pages.contacts')}</DefaultTitle>

        <div className="contacts__features">
          {contactsFeatures.map(({ id, title, text, image }) => (
            <div key={id} className="content">
              <div className="content_image">
                {image}
              </div>
              <div className="content_container">
                <div className="content_title">
                  {t(title)}
                </div>
                <div className="content_text">
                  {t(text)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      {/*https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d934.2195972250548!2d28.83259621669871!3d47.02454163519121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3470a2d9b5%3A0xc74f4ac8ebc6b645!2z0KLRgNC40YPQvNGE0LDQu9GM0L3QsNGPINCQ0YDQutCw!5e0!3m2!1sru!2s!4v1686404999542!5m2!1sru!2s*/}
      <DefaultMap
        link={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1321.349043006815!2d28.82546725314592!3d47.01795442701501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dc7121cc699%3A0x2313f5ebcbb541d!2sFacultatea%20de%20Matematic%C4%83%20%C8%99i%20Informatic%C4%83%20a%20USM!5e0!3m2!1sru!2s!4v1686404730156!5m2!1sru!2s'}/>
    </div>
  );
};

export default Contacts;