"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Link as LinkIcon } from 'lucide-react';

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('upload'); // 'upload' or 'url'

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage(null);

    let imageUrl = '';

    try {
      // Handle image based on the selected method
      if (uploadMethod === 'upload' && data.schoolImage?.length > 0) {
        const file = data.schoolImage[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.message || 'Image upload failed');
        }
        imageUrl = uploadResult.filename; // Use the saved filename
      } else if (uploadMethod === 'url') {
        imageUrl = data.imageUrl; // Use the provided URL directly
      }

      // Prepare school data for submission
      const schoolData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imageUrl, // This will be either the filename or the full URL
      };
      
      const schoolResponse = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolData),
      });

      const schoolResult = await schoolResponse.json();

      if (!schoolResponse.ok) {
        throw new Error(schoolResult.message || 'Failed to add school');
      }

      setMessage({ type: 'success', text: 'School added successfully!' });
      reset();

    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add a New School</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Input fields for school details */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
          <input type="text" id="name" {...register('name', { required: 'School name is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* ... other text fields (address, city, etc.) ... */}
         <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" {...register('address', { required: 'Address is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" {...register('city', { required: 'City is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input type="text" id="state" {...register('state', { required: 'State is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
        </div>
        <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input type="tel" id="contact" {...register('contact')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
        </div>
        <div>
            <label htmlFor="email_id" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email_id" {...register('email_id', { pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
            {errors.email_id && <p className="text-red-500 text-xs mt-1">{errors.email_id.message}</p>}
        </div>

        {/* Image Input Section with Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Image</label>
          <div className="flex rounded-md shadow-sm">
             <button type="button" onClick={() => setUploadMethod('upload')} className={`relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-l-md transition-colors ${uploadMethod === 'upload' ? 'bg-cyan-600 text-white border-cyan-600 z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                <Upload className="h-5 w-5" />
                <span>Upload</span>
             </button>
             <button type="button" onClick={() => setUploadMethod('url')} className={`relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-r-md transition-colors ${uploadMethod === 'url' ? 'bg-cyan-600 text-white border-cyan-600 z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                <LinkIcon className="h-5 w-5" />
                <span>From URL</span>
             </button>
          </div>
        </div>

        {/* Conditional Input Field */}
        {uploadMethod === 'upload' ? (
          <div>
            <label htmlFor="schoolImage" className="sr-only">Choose file</label>
            <input type="file" id="schoolImage" {...register('schoolImage')} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-60 file:text-cyan-700 hover:file:bg-cyan-100" />
          </div>
        ) : (
          <div>
            <label htmlFor="imageUrl" className="sr-only">Image URL</label>
            <input type="url" id="imageUrl" {...register('imageUrl', { required: 'Image URL is required' })} placeholder="https://example.com/image.jpg" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
            {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>}
          </div>
        )}

        {/* Submission Button */}
        <div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-500">
            {isSubmitting ? 'Submitting...' : 'Add School'}
          </button>
        </div>
      </form>

      {/* Status Message */}
      {message && (
        <div className={`mt-4 text-sm p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

