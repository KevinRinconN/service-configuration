import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";


const ProfileCard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden shadow-md w-full mb-6">
        <CardHeader className="relative p-0">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={user.profilePicture} alt={user.firstname} />
              <AvatarFallback className="text-3xl">
                {user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-12 pb-4 px-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {user.firstname + " " + user.lastname}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            {user.bio && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Acerca de
                </h3>
                <p className="text-sm">{user.bio}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
