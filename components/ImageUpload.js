'use client';
import { useState } from 'react';

export default function ImageUpload({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'ml_default');
    const res = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
      method: 'POST',
      body: fd
    });
    const data = await res.json();
    onUpload(data.secure_url);
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={upload} className="block my-2" />
      {loading && <p className="text-sm">上传中...</p>}
    </div>
  );
}
