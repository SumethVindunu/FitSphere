package backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.PutMapping;
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
    //Display
    @GetMapping("/user")
    List<UserModel>getAllUsers(){return userRepository.findAll();}

    @GetMapping("/user/{id}")

    UserModel getUserId(@PathVariable Long id){
        return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
    }
    

}
