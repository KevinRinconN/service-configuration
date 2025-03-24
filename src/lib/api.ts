
export interface Post {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture: string;
  content: string;
  likes: number;
  timestamp: Date;
  liked: boolean;
}

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Laura Martínez',
    userProfilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Acabo de terminar mi último proyecto de diseño. ¡No puedo esperar para compartirlo con todos ustedes!',
    likes: 15,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    liked: false,
  },
  {
    id: '2',
    userId: '3',
    userName: 'Carlos Rodríguez',
    userProfilePicture: 'https://randomuser.me/api/portraits/men/54.jpg',
    content: 'Las tendencias de diseño en 2023 están evolucionando hacia interfaces más minimalistas y funcionales. ¿Qué opinan?',
    likes: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    liked: false,
  },
  {
    id: '3',
    userId: '4',
    userName: 'Ana Gómez',
    userProfilePicture: 'https://randomuser.me/api/portraits/women/22.jpg',
    content: 'Hoy tuve una reunión increíble con clientes potenciales. El diseño UX realmente marca la diferencia en cómo perciben un producto.',
    likes: 31,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    liked: false,
  },
  {
    id: '4',
    userId: '5',
    userName: 'Miguel Torres',
    userProfilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: '¿Alguien ha probado la nueva herramienta de prototipado? Me gustaría saber sus opiniones antes de comprarla.',
    likes: 9,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    liked: false,
  },
  {
    id: '5',
    userId: '6',
    userName: 'Sofía Herrera',
    userProfilePicture: 'https://randomuser.me/api/portraits/women/89.jpg',
    content: 'Estoy organizando un webinar sobre diseño responsivo la próxima semana. ¿Quién estaría interesado en participar?',
    likes: 42,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    liked: false,
  },
  {
    id: '6',
    userId: '7',
    userName: 'Javier López',
    userProfilePicture: 'https://randomuser.me/api/portraits/men/76.jpg',
    content: 'Acabo de lanzar mi portafolio actualizado. Me encantaría recibir feedback de la comunidad de diseñadores.',
    likes: 18,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
    liked: false,
  },
];

// Function to get all posts
export const getPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Retrieve posts from localStorage or use mockPosts
  const storedPosts = localStorage.getItem('posts');
  if (storedPosts) {
    return JSON.parse(storedPosts).map((post: any) => ({
      ...post,
      timestamp: new Date(post.timestamp)
    }));
  }
  
  // If no posts in localStorage, use mockPosts
  localStorage.setItem('posts', JSON.stringify(mockPosts));
  return mockPosts;
};

// Function to like/unlike a post
export const toggleLike = async (postId: string, userId: string): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Get posts from localStorage
  const storedPosts = localStorage.getItem('posts');
  let posts: Post[] = storedPosts 
    ? JSON.parse(storedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp)
      }))
    : mockPosts;
  
  // Find post and toggle like
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) throw new Error('Post not found');
  
  const post = posts[postIndex];
  const liked = !post.liked;
  
  // Update post with new like status
  posts[postIndex] = {
    ...post,
    liked,
    likes: liked ? post.likes + 1 : post.likes - 1
  };
  
  // Save updated posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));
  
  return posts[postIndex];
};

// Function to create a new post
export const createPost = async (userId: string, userName: string, userProfilePicture: string, content: string): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Create new post
  const newPost: Post = {
    id: Date.now().toString(),
    userId,
    userName,
    userProfilePicture,
    content,
    likes: 0,
    timestamp: new Date(),
    liked: false,
  };
  
  // Get existing posts from localStorage
  const storedPosts = localStorage.getItem('posts');
  let posts: Post[] = storedPosts 
    ? JSON.parse(storedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp)
      }))
    : mockPosts;
  
  // Add new post to beginning of array
  posts = [newPost, ...posts];
  
  // Save updated posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));
  
  return newPost;
};
