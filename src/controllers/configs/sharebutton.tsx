import { Share } from "react-native";

export const shareLink = async () => {
    try {
      const result = await Share.share({
        message: 'Viaje fácil, viaje com a EasyPass: https://easypass-app.onrender.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Compartilhado via ${result.activityType}`);
        } else {
          console.log('Compartilhamento cancelado');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento dispensado');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error.message);
    }
}