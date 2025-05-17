package backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.repository.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("message", "Invalid credentials"));
        }
    }

    // Get all users
    @GetMapping("/user")
    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by id
    @GetMapping("/user/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long id) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }

    // Update a user profile
    @PutMapping("/user/{id}")
    public UserModel updateProfile(@RequestBody UserModel newUserModel, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(userModel -> {
                    userModel.setFullname(newUserModel.getFullname());
                    userModel.setEmail(newUserModel.getEmail());
                    userModel.setPassword(newUserModel.getPassword());
                    userModel.setPhone(newUserModel.getPhone());
                    return userRepository.save(userModel);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    // Delete a user profile
    @DeleteMapping("/user/{id}")
    public String deleteProfile(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User account " + id + " deleted successfully";
    }

    // Follow a user
    @PostMapping("/user/follow/{targetId}")
    public ResponseEntity<Map<String, Object>> followUser(@PathVariable Long targetId, @RequestBody Map<String, Long> payload) {
        Long followerId = payload.get("followerId");
        UserModel follower = userRepository.findById(followerId)
            .orElseThrow(() -> new UserNotFoundException("Follower not found with id: " + followerId));
        UserModel target = userRepository.findById(targetId)
            .orElseThrow(() -> new UserNotFoundException("Target user not found with id: " + targetId));

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

    // Unfollow a user
    @PostMapping("/user/unfollow/{targetId}")
    public ResponseEntity<Map<String, Object>> unfollowUser(@PathVariable Long targetId, @RequestBody Map<String, Long> payload) {
        Long followerId = payload.get("followerId");
        UserModel follower = userRepository.findById(followerId)
            .orElseThrow(() -> new UserNotFoundException("Follower not found with id: " + followerId));
        UserModel target = userRepository.findById(targetId)
            .orElseThrow(() -> new UserNotFoundException("Target user not found with id: " + targetId));

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
}