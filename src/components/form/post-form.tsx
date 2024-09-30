import React, { useState } from 'react';
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";

const PostForm = () => {
  const [content, setContent] = useState('');
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      setContent('');
      void ctx.post.timeline.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Üniversite hayatınızda neler oluyor?"
        className="w-full"
      />
      <Button type="submit" disabled={isLoading || content.trim().length === 0}>
        {isLoading ? 'Gönderiliyor...' : 'Paylaş'}
      </Button>
    </form>
  );
};

export default PostForm;