import React from 'react';
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const contactInfo = [
    {
      icon: 'mdi:email',
      title: 'E-mail',
      details: ['info@idealcasting.net'],
      link: 'mailto:info@idealcasting.net'
    },
    {
      icon: 'mdi:phone',
      title: 'Phone number',
      details: ['+256 785 436066'],
      link: 'tel:+256785436066'
    },
    {
      icon: 'mdi:clock',
      title: 'Work Hours',
      details: [
        'Monday to Friday: 09:00 - 17:00',
        'Fridays: 09:00 - 14:00 for profiling'
      ]
    }
  ];

  // Validation Schema
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    industry: Yup.string()
      .required('Please select an industry'),
    message: Yup.string()
      .min(10, 'Message is too short')
      .max(1000, 'Message is too long')
      .required('Message is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // TODO: Implement your form submission logic here
      console.log('Form values:', values);
      // Reset form after successful submission
      resetForm();
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)]">
      <div className="flex-grow">
        <div className="px-6 sm:px-12 lg:px-24 pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-24">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
              {/* Left Column - Contact Information */}
              <div className="space-y-8 md:space-y-10 lg:space-y-12">
                <div>
                  <span className="text-[var(--color-primary-500)] text-sm sm:text-base font-medium mb-4 sm:mb-6 block tracking-wide">
                    WE'RE HERE TO HELP YOU
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent-900)] mb-4 sm:mb-6 leading-tight">
                    Discuss Your <br className="hidden sm:block" />
                    Talent Needs
                  </h1>
                  <p className="text-base sm:text-lg text-[var(--color-accent-600)] mb-8 sm:mb-10 lg:mb-12 max-w-xl">
                    Are you looking for top-quality talent solutions tailored to your needs? 
                    Reach out to us.
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4 sm:space-x-5">
                      <div className="bg-[var(--color-primary-500)]/10 p-3 sm:p-4 rounded-full">
                        <Icon 
                          icon={info.icon} 
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary-500)]" 
                        />
                      </div>
                      <div>
                        <div className="text-sm text-[var(--color-accent-600)] mb-1">
                          {info.title}
                        </div>
                        {info.details.map((detail, idx) => (
                          <p 
                            key={idx} 
                            className="text-sm sm:text-base text-[var(--color-accent-900)] font-medium"
                          >
                            {info.link ? (
                              <a 
                                href={info.link}
                                className="hover:text-[var(--color-primary-500)] transition-colors duration-200"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    industry: '',
                    message: ''
                  }}
                  validationSchema={ContactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="space-y-5 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                          Name
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className={`w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] ${
                            errors.name && touched.name ? 'ring-2 ring-red-500' : ''
                          }`}
                          placeholder="Charles Aroma"
                        />
                        {errors.name && touched.name && (
                          <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                          Email
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className={`w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] ${
                            errors.email && touched.email ? 'ring-2 ring-red-500' : ''
                          }`}
                          placeholder="charlesaroma@gmail.com"
                        />
                        {errors.email && touched.email && (
                          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                          Industry
                        </label>
                        <Field
                          as="select"
                          name="industry"
                          className={`w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] ${
                            errors.industry && touched.industry ? 'ring-2 ring-red-500' : ''
                          }`}
                        >
                          <option value="">Select...</option>
                          <option value="film">Film & TV</option>
                          <option value="commercial">Commercial</option>
                          <option value="theater">Theater</option>
                          <option value="modeling">Modeling</option>
                          <option value="other">Other</option>
                        </Field>
                        {errors.industry && touched.industry && (
                          <div className="text-red-500 text-sm mt-1">{errors.industry}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                          Message
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          rows="4"
                          className={`w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] ${
                            errors.message && touched.message ? 'ring-2 ring-red-500' : ''
                          }`}
                          placeholder="Type your message..."
                        />
                        {errors.message && touched.message && (
                          <div className="text-red-500 text-sm mt-1">{errors.message}</div>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full group relative flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-primary-500)] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[var(--color-primary-600)] transition-all duration-200 hover:scale-[1.02] ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : 'Get a Solution'}
                        <Icon 
                          icon="mdi:arrow-right" 
                          className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;