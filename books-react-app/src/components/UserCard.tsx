import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import userImage from '@/assets/images/user.svg';
import styles from '@/assets/scss/userList.module.scss';
import { openModal } from '@/store/ui';
import { User } from '@/types/User';

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {

    const dispatch = useDispatch();

    const deleteUser = () => {
        dispatch(
            openModal({
                type: "CONFIRM_DELETE",
                data: { entity: "user", id: user.id },
            })
        );
    };

    const image = user.imagePath ? `${baseUrl}/${user.imagePath}` : userImage;

    return (
        <div className={styles.userCard} data-testid="user-card">
            user
        </div>
    );
};

export default UserCard;
