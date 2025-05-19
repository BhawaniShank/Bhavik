import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone, Mail, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ContactCard = ({ contact, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deleterow = (e) => {
    e.stopPropagation();
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("phone_number", contact.phone_number);

      const response = await axios.post(
        "https://zivaworld.online/microservices/delete_user.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("User deleted successfully");
        if (onDelete) {
          onDelete(contact.phone_number);
        }
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
    setShowDelete(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 lg:p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img src={contact.front_image} alt="background" className="w-full h-40 sm:h-48 object-cover" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/user-details" state={{ contact }}>
              <div className="flex-1">
                <h2 className="text-md font-semibold">{contact.username}</h2>
                <p className="text-gray-500 text-sm">Vendor</p>
              </div>
            </Link>
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
            <div className="mt-3 border-t flex items-center justify-between pt-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{contact.phone_number}</span>
              </div>
              <button
                onClick={deleterow}
                className="cursor-pointer hidden md:block rounded-sm p-2"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <Trash />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {showDelete && (
        <div 
          onClick={() => setShowDelete(false)} 
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white p-4 rounded shadow-md"
          >
            <p>Are you sure you want to delete this contact?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const handleDelete = (phoneNumber) => {
    setContacts(contacts.filter(contact => contact.phone_number !== phoneNumber));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zivaworld.online/microservices/fetch_users.php",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("success response", response.data);
          setContacts(response.data.data);
        }
      } catch (error) {
        console.log("error response", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-6 w-full max-w-7xl mx-auto">
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
