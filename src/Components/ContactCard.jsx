import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone, Mail } from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "Elizabeth Park",
    role: "Work contact",
    phone: "(650) 555-1234",
    email: "heyfromelizabeth@gmail.com",
    profileImg: "https://picsum.photos/50?random=1",
    bgImg: "https://picsum.photos/500/200?random=1",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Personal contact",
    phone: "(123) 456-7890",
    email: "johndoe@example.com",
    profileImg: "https://picsum.photos/50?random=2",
    bgImg: "https://picsum.photos/500/200?random=2",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Business contact",
    phone: "(987) 654-3210",
    email: "sophia.lee@business.com",
    profileImg: "https://picsum.photos/50?random=3",
    bgImg: "https://picsum.photos/500/200?random=3",
  },
  {
    id: 4,
    name: "Michael Smith",
    role: "Friend",
    phone: "(555) 123-4567",
    email: "michael.smith@email.com",
    profileImg: "https://picsum.photos/50?random=4",
    bgImg: "https://picsum.photos/500/200?random=4",
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Colleague",
    phone: "(111) 222-3333",
    email: "emily.davis@work.com",
    profileImg: "https://picsum.photos/50?random=5",
    bgImg: "https://picsum.photos/500/200?random=5",
  },
];

const ContactCard = ({ contact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-2 lg:p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img src={contact.bgImg} alt="background" className="w-full h-40 sm:h-48 object-cover" />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img src={contact.profileImg} alt="profile" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <h2 className="text-md font-semibold">{contact.name}</h2>
              <p className="text-gray-500 text-sm">{contact.role}</p>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 border-t pt-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mt-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>{contact.email}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-6 w-full max-w-7xl mx-auto">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;