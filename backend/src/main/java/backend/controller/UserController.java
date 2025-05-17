package backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
=======
import org.springframework.web.bind.annotation.DeleteMapping;
>>>>>>> b001f164e8c619e11c1ad6bedd1652b067a2dd6f
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.PutMapping;
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // register
    @PostMapping("/user")
    public UserModel newUserModel(@RequestBody UserModel newUserModel) {
        System.out.println("Full Name: " + newUserModel.getFullname()); // Debug log

        return userRepository.save(newUserModel);

    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserModel loginDetails) {
        UserModel user = userRepository.findByEmail(loginDetails.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Email not found: " + loginDetails.getEmail()));

        if (user.getPassword().equals(loginDetails.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Successful");
            response.put("id", user.getId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }

    }
     // Display
    @GetMapping("/user")
    List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

     @GetMapping("/user/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long id) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }
     @PutMapping("/user/{id}")
    UserModel updateProfile(@RequestBody UserModel newUserModel, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(userModel -> {
                    userModel.setFullname(newUserModel.getFullname());
                    userModel.setEmail(newUserModel.getEmail());
                    userModel.setPassword(newUserModel.getPassword());
                    userModel.setPhone(newUserModel.getPhone());
                    return userRepository.save(userModel);
                }).orElseThrow(() -> new UserNotFoundException(id));
    };

   
    
    @PostMapping("/user/follow/{targetId}")
    public ResponseEntity<Map<String, Object>> followUser(@PathVariable Long targetId, @RequestBody Map<String, Long> payload) {
        Long followerId = payload.get("followerId");
        UserModel follower = userRepository.findById(followerId)
            .orElseThrow(() -> new UserNotFoundException("Follower not found with id: " + followerId));
        UserModel target = userRepository.findById(targetId)
            .orElseThrow(() -> new UserNotFoundException("Target user not found with id: " + targetId));

        // Safely increment follow counts
        target.setFollowers((target.getFollowers() == null ? 0 : target.getFollowers()) + 1);
        follower.setFollowing((follower.getFollowing() == null ? 0 : follower.getFollowing()) + 1);

        userRepository.save(target);
        userRepository.save(follower);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Follow successful");
        response.put("targetFollowers", target.getFollowers());
        response.put("followerFollowing", follower.getFollowing());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/user/unfollow/{targetId}")
    public ResponseEntity<Map<String, Object>> unfollowUser(@PathVariable Long targetId, @RequestBody Map<String, Long> payload) {
        Long followerId = payload.get("followerId");
        UserModel follower = userRepository.findById(followerId)
            .orElseThrow(() -> new UserNotFoundException("Follower not found with id: " + followerId));
        UserModel target = userRepository.findById(targetId)
            .orElseThrow(() -> new UserNotFoundException("Target user not found with id: " + targetId));

        // Safely decrement follow counts (without going below zero)
        int currentTargetFollowers = (target.getFollowers() == null ? 0 : target.getFollowers());
        int currentFollowerFollowing = (follower.getFollowing() == null ? 0 : follower.getFollowing());
        target.setFollowers(currentTargetFollowers > 0 ? currentTargetFollowers - 1 : 0);
        follower.setFollowing(currentFollowerFollowing > 0 ? currentFollowerFollowing - 1 : 0);

        userRepository.save(target);
        userRepository.save(follower);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Unfollow successful");
        response.put("targetFollowers", target.getFollowers());
        response.put("followerFollowing", follower.getFollowing());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

  

    @GetMapping("/user/all")
    public List<UserModel> getAllUsers(@RequestParam(required = false) Long excludeId) {
        List<UserModel> users = userRepository.findAll();
        if (excludeId != null) {
            users.removeIf(user -> user.getId().equals(excludeId));
        }
        return users;
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // Display
    @GetMapping("/user")
    List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")

    UserModel getUserId(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    UserModel updateProfile(@RequestBody UserModel newUserModel, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(userModel -> {
                    userModel.setFullname(newUserModel.getFullname());
                    userModel.setEmail(newUserModel.getEmail());
                    userModel.setPassword(newUserModel.getPassword());
                    userModel.setPhone(newUserModel.getPhone());
                    return userRepository.save(userModel);
                }).orElseThrow(() -> new UserNotFoundException(id));
    };

    @DeleteMapping("/user/{id}")
    String deleteProfile(@PathVariable Long id) {
        if (!userRepository.existsById(id)) { // Fix: Check if the user does NOT exist
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id); // Fix: Use deleteById instead of deleteAllById
        return "User account " + id + " deleted successfully"; // Fix: Correct string concatenation
    }

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    //Display
    @GetMapping("/user")
    List<UserModel>getAllUsers(){return userRepository.findAll();}

    @GetMapping("/user/{id}")

    UserModel getUserId(@PathVariable Long id){
        return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
    }
    

}
