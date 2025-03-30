package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel,Long> {

}
