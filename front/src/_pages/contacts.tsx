import React, { FC } from 'react';
import {
  ContactsCallIcon,
  ContactsEmailIcon,
  ContactsFaxIcon,
  ContactsLocationIcon,
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
      <DefaultTitle className="contacts__title">Contacts</DefaultTitle>

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
    </div>
  );
};

export default Contacts;