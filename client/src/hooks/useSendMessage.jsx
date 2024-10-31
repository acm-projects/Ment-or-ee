import React, { useState } from "react";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    try {
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
};

export default useSendMessage;
