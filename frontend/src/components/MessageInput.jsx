import { Send, Image, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const fileinputref = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please enter an image");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileinputref.current) fileinputref.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileinputref.current) fileinputref.current.value = "";
    } catch (error) {
      console.log("Failed to send message", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl px-4 py-2 border-t border-gray-200">
      {imagePreview && (
        <div className="w-40 h-40 sm:max-w-sm relative flex items-center justify-center mb-3">
          <img
            src={imagePreview}
            className="w-30 h-30 relative top-2 rounded-lg"
            alt="Preview"
          />
          <button
            className="absolute top-2 right-2 bg-black/10 rounded-full p-1"
            onClick={removeImage}
          >
            <X className="text-red-600" size={20} />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage}>
        <div className="flex items-center gap-2 w-full">
          <input
            className="w-full h-12 border-gray-300 border rounded-full px-4 text-gray-900 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Type Something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileinputref}
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            className={`flex items-center justify-center rounded-full p-2 ${
              imagePreview ? "text-emerald-500" : "text-gray-900"
            }`}
            onClick={() => fileinputref.current?.click()}
          >
            <Image size={26} />
          </button>

          <button
            type="submit"
            className="flex items-center justify-center rounded-full p-2 text-black disabled:opacity-30"
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
