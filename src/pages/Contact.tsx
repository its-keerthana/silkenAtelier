import { useState } from "react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: "" },
  });

    const handleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      const response = await fetch('https://formspree.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'An error occurred. Please try again later.' },
      });
    }
  };


    return (
        <>
            <h2 className="heading">Contact Us</h2>

            <form onSubmit={handleSubmit} className="form">
                <div className="fieldGroup">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>

                <div className="fieldGroup">
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>

                <div className="fieldGroup">
                    <label htmlFor="subject" className="label">Subject</label>
                    <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>

                <div className="fieldGroup">
                    <label htmlFor="message" className="label">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="textarea"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status.submitting}
                    className={status.submitting ? 'buttonDisabled' : 'button'}
                >
                    {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
             {status.info.msg && (
        <div className={status.info.error ? 'errorMessage' : 'successMessage'}>
          {status.info.msg}
        </div>
      )}
        </>
    )
}