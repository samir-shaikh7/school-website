import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

const Messages = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from("contacts").select("*");
    setMessages(data || []);
  };

  const deleteMessage = async (id: number) => {
    await supabase.from("contacts").delete().eq("id", id);
    fetchMessages();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Message</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.phone}</td>
                <td className="p-3">{msg.message}</td>

                <td className="p-3">
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Messages;