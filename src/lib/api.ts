
export interface Post {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture: string;
  content: string;
  likes: number;
  timestamp: Date;
  liked: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture: string;
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  profilePicture: string;
  bio?: string;
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
    comments: [
      {
        id: '101',
        userId: '3',
        userName: 'Carlos Rodríguez',
        userProfilePicture: 'https://randomuser.me/api/portraits/men/54.jpg',
        content: '¡Felicidades! Me encantaría verlo pronto.',
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
      },
      {
        id: '102',
        userId: '4',
        userName: 'Ana Gómez',
        userProfilePicture: 'https://randomuser.me/api/portraits/women/22.jpg',
        content: '¿De qué trata el proyecto? ¡Suena interesante!',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
      }
    ]
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
    comments: [
      {
        id: '201',
        userId: '5',
        userName: 'Miguel Torres',
        userProfilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Estoy totalmente de acuerdo. La simplicidad es clave para una buena experiencia de usuario.',
        timestamp: new Date(Date.now() - 1000 * 60 * 240),
      }
    ]
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
    comments: []
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
    comments: [
      {
        id: '401',
        userId: '6',
        userName: 'Sofía Herrera',
        userProfilePicture: 'https://randomuser.me/api/portraits/women/89.jpg',
        content: 'Yo la he usado durante un mes y me parece excelente. Muy intuitiva y con muchas opciones.',
        timestamp: new Date(Date.now() - 1000 * 60 * 600),
      }
    ]
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
    comments: []
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
    comments: []
  },
];

// Mock user profiles
const mockUserProfiles: Record<string, UserProfile> = {
  '2': {
    id: '2',
    name: 'Laura Martínez',
    profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Diseñadora UX/UI con 5 años de experiencia. Apasionada por crear experiencias digitales que conecten con las personas.',
  },
  '3': {
    id: '3',
    name: 'Carlos Rodríguez',
    profilePicture: 'https://randomuser.me/api/portraits/men/54.jpg',
    bio: 'Product Designer especializado en interfaces minimalistas y funcionales. Amante del buen café y del diseño que resuelve problemas reales.',
  },
  '4': {
    id: '4',
    name: 'Ana Gómez',
    profilePicture: 'https://randomuser.me/api/portraits/women/22.jpg',
    bio: 'Consultora de UX Research. Me encanta descubrir insights valiosos que ayuden a mejorar productos digitales.',
  },
  '5': {
    id: '5',
    name: 'Miguel Torres',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Diseñador de interacción y profesor universitario. Creo que el diseño debe ser accesible para todos.',
  },
  '6': {
    id: '6',
    name: 'Sofía Herrera',
    profilePicture: 'https://randomuser.me/api/portraits/women/89.jpg',
    bio: 'Frontend Developer con pasión por el diseño. Trabajo en la intersección entre código y experiencia de usuario.',
  },
  '7': {
    id: '7',
    name: 'Javier López',
    profilePicture: 'https://randomuser.me/api/portraits/men/76.jpg',
    bio: 'Diseñador freelance especializado en branding e identidad visual para startups.',
  },
};

// Function to get all posts
export const getPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Retrieve posts from localStorage or use mockPosts
  const storedPosts = localStorage.getItem('posts');
  if (storedPosts) {
    return JSON.parse(storedPosts).map((post: any) => ({
      ...post,
      timestamp: new Date(post.timestamp),
      comments: post.comments?.map((comment: any) => ({
        ...comment,
        timestamp: new Date(comment.timestamp)
      })) || []
    }));
  }
  
  // If no posts in localStorage, use mockPosts
  localStorage.setItem('posts', JSON.stringify(mockPosts));
  return mockPosts;
};

// Function to get user profile by ID
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockUserProfiles[userId] || null;
};

// Function to get user posts
export const getUserPosts = async (userId: string): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get all posts
  const posts = await getPosts();
  
  // Filter posts by userId
  return posts.filter(post => post.userId === userId);
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
        timestamp: new Date(post.timestamp),
        comments: post.comments?.map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        })) || []
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

// Function to add a comment to a post
export const addComment = async (
  postId: string, 
  userId: string, 
  userName: string,
  userProfilePicture: string,
  content: string
): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get posts from localStorage
  const storedPosts = localStorage.getItem('posts');
  let posts: Post[] = storedPosts 
    ? JSON.parse(storedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
        comments: post.comments?.map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        })) || []
      }))
    : mockPosts;
  
  // Find post
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) throw new Error('Post not found');
  
  // Create new comment
  const newComment: Comment = {
    id: Date.now().toString(),
    userId,
    userName,
    userProfilePicture,
    content,
    timestamp: new Date(),
  };
  
  // Add comment to post
  posts[postIndex] = {
    ...posts[postIndex],
    comments: [...(posts[postIndex].comments || []), newComment]
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
    comments: []
  };
  
  // Get existing posts from localStorage
  const storedPosts = localStorage.getItem('posts');
  let posts: Post[] = storedPosts 
    ? JSON.parse(storedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
        comments: post.comments?.map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        })) || []
      }))
    : mockPosts;
  
  // Add new post to beginning of array
  posts = [newPost, ...posts];
  
  // Save updated posts to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));
  
  return newPost;
};
