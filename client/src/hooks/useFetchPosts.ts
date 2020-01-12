import { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase.utils';
import { IPost } from '../interfaces/models/post';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function anyNameFunction() {
      try {
        const snapshot = await firestore.collection('posts').orderBy('createAt', 'desc').limit(5).get();
        const data: any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    anyNameFunction();
  }, []);

  return { posts, loading, error };
};
