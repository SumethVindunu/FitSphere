// package backend.repository;

// import org.springframework.data.jpa.repository.JpaRepository;
// import backend.model.StatusModel;

// import java.util.List;
// import java.util.Optional;

// public interface StatusRepository extends JpaRepository<StatusModel, Long> {
//     List<StatusModel> findByUserId(Long userId);
//     Optional<StatusModel> findByIdAndUserId(Long id, Long userId);
// }



package backend.repository;

import backend.model.StatusModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StatusRepository extends JpaRepository<StatusModel, Long> {
    List<StatusModel> findByUserId(Long userId);
}
