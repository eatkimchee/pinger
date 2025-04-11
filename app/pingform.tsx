import React, { useState } from 'react';

export function PingForm() {
  const [formData, setFormData] = useState({
    host: '',
  });
  const [error, setError] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onInputClick = () => {
    setError('');
    setResponseText('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.host) {
      return;
    }

    const multipartData = new FormData();
    for(const name in formData) {
      multipartData.append(name, formData[name as keyof typeof formData]);
    }

    // try getting server from query param
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const server = urlParams.get('server') || "/api/ping";

    try {
      const response = await fetch(server, {
        method: 'POST',
        body: multipartData, 
      });

      if (response.ok) {
        // Handle success, maybe clear the form
        const responseText = await response.text();
        setResponseText(responseText);
      } else {
        console.error("error response:", response.statusText);
        setError(response.statusText|| `Error: ${response.status}`);
        // Handle error
      }
    } catch (error: any) {
      console.log("error:", error?.message || 'unknown');
      setError(error?.message || "Error sending request");
    }
  };

  return (
    <div>
        <div className="w-full">
          <div className="flex justify-center items-center px-4 py-2" >
            <label className="text-right pr-2">Download cert</label>
            <a href="/ca-cert.crt" className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 mx-4 px-4 rounded" type="submit">            
              Downlaod ca-cert
            </a>
          </div>
        </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center py-2" >
          <label className="text-right px-4" htmlFor="host">Ping something</label>
          <input
            className="appearance-none block text-white-700 mr-3 py-1 px-2 border border-teal-500"
            type="text"
            id="host"
            name="host"
            placeholder="host"
            value={formData.host}
            onChange={handleChange}
            onClick={onInputClick}
            required
          />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Ping</button>
        </div>
      </form>
      {error
        ? <div>
            <div className="py-1 px-2 my-5 border border-red-300 bg-red-400 rounded">{error}</div>
          </div>
        : null
      }
      {responseText
        ? <div style={{whiteSpace: "pre-wrap"}}>{responseText}</div>
        : null
      }
    </div>
  );
}

