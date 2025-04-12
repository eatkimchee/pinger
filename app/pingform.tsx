import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'


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
    <div className="p-4 w-full max-w-1024">
        <div className="w-full">
          <div className="flex  items-center px-4 py-2" >
          </div>
        </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-right">
            <label className="">Certificate</label>
          </div>
          <div className="col-span-3"> 
            <a href="/ca-cert.crt" download={true} className="flex text-teal-500 ">
              <div className="flex gap-1 items-center">
                Download ca-cert.crt
                <ArrowDownTrayIcon className="flex size-5 text-teal-500" />
              </div>
            </a>
          </div>
          <div className="text-right">
            <label className="" htmlFor="host">Ping stuff</label>
          </div>
          <div className="col-span-3 ">
            <div className="flex"> 
              <input
                className="appearance-none w-full flex-grow text-white-700 mr-3 py-1 px-2 border border-teal-500"
                type="text"
                id="host"
                name="host"
                placeholder="host"
                value={formData.host}
                onChange={handleChange}
                onClick={onInputClick}
                required
              />
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-4 rounded" type="submit">Send</button>
            </div>
          </div>
        </div>
      </form>
      {error
        ? <div>
            <div className="py-1 px-2 my-5 border border-red-300 bg-red-400 rounded">{error}</div>
          </div>
        : null
      }
      <hr className="text-zinc-700 mt-10" />
      {responseText
        ? <div className="whitespace-pre-wrap p-4 overflow-x-scroll bg-zinc-900 text-white">
              {responseText}
          </div>
        : null
      }
    </div>
  );
}

