import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const AdminPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log('Original Form Data:', data);
  
    // Validate all fields
    if (
      Object.values(data).some(
        (field) => !field || (field instanceof FileList && field.length === 0)
      )
    ) {
      toast.error('Please fill all important fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('mobileNo', data.mobileNo);
    formData.append('address', data.address);
    formData.append('joiningDate', data.joiningDate);
    formData.append('businessName', data.businessName);
  
    // Append files directly
    formData.append('image', data.image[0]);
    formData.append('qr', data.qr[0]);
    console.log('Formmmmmm Data:', data);
  
    try {
      const response = await axios.post(
        'https://zivaworld.online/microservices/add_user.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Server Response:', response.data);
  
      if (response.data.status === 'success') {
        toast.success('Form submitted successfully!');
        reset();
      } else {
        toast.error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const imageValidation = {
    required: 'Image is required',
    validate: {
      fileType: (value) => {
        if (!value[0]?.name.match(/\.(png|jpg|JPG|jpeg)$/)) {
          return 'Only PNG, JPG formats are allowed';
        }
        return true;
      },
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-2xl"
      >
        <div className="bg-gray-100 p-4 rounded-xl flex flex-col">
          <label><strong>Username:</strong></label>
          <input
            {...register('username', { required: 'Username is required' })}
            placeholder="Enter Username"
            className="p-2 rounded mb-2"
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}





          <label><strong>Password:</strong></label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Enter Password"
            className="p-2 rounded mb-2"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          <label><strong>Upload Image:</strong></label>
          <input
            {...register('image', imageValidation)}
            type="file"
            className="p-2 mb-2"
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}

          <label><strong>Upload QR Code:</strong></label>
          <input
            {...register('qr', { required: 'QR Code is required' })}
            type="file"
            className="p-2 mb-2"
          />
          {errors.qr && <span className="text-red-500">{errors.qr.message}</span>}
        </div>

        <div className="bg-gray-100 p-4 rounded-xl flex flex-col">
          <label><strong>Address:</strong></label>
          <input
            {...register('address', { required: 'Address is required' })}
            placeholder="Enter Address"
            className="p-2 rounded mb-2"
          />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}

          <label><strong>Business Name:</strong></label>
          <input
            {...register('businessName', { required: 'Business Name is required' })}
            placeholder="Enter Business Name"
            className="p-2 rounded mb-2"
          />
          {errors.businessName && <span className="text-red-500">{errors.businessName.message}</span>}

          <label><strong>Mobile No:</strong></label>
          <input
            {...register('mobileNo', { required: 'Mobile No is required' })}
            placeholder="Enter Mobile No"
            
            className="p-2 rounded mb-2"
            type="number"
          />
          {errors.mobileNo && <span className="text-red-500">{errors.mobileNo.message}</span>}

          <label><strong>Joining Date:</strong></label>
          <input
            {...register('joiningDate', { required: 'Joining Date is required' })}
            type="date"
            className="p-2 rounded mb-2"
          />
          {errors.joiningDate && <span className="text-red-500">{errors.joiningDate.message}</span>}
        </div>

        

        <button
          type="submit"
          className="md:w-[50%] w-2/3 mx-auto p-2 rounded mt-4 md:col-span-2"
          style={{color: "white",border:"none",backgroundColor:"#007bff"}}
        >
          Submit
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default AdminPage;