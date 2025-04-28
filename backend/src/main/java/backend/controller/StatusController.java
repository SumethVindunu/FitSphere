package backend.controller;

import backend.model.StatusModel;
import backend.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class StatusController {

    @Autowired
    private StatusRepository statusRepository;

    // // Create a new status
    // @PostMapping("/status")
    // public ResponseEntity<StatusModel> createStatus(@RequestBody StatusModel status) {
    //     StatusModel savedStatus = statusRepository.save(status);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedStatus);
    // }

    // // Get all statuses by user ID
    // @GetMapping("/statuses/{userId}")
    // public ResponseEntity<List<StatusModel>> getStatuses(@PathVariable Long userId) {
    //     List<StatusModel> statuses = statusRepository.findByUserId(userId);
    //     return ResponseEntity.ok(statuses);
    // }

    // // Update a status
    // @PutMapping("/status/{id}")
    // public ResponseEntity<StatusModel> updateStatus(@PathVariable Long id, @RequestBody StatusModel statusDetails) {
    //     return statusRepository.findById(id)
    //             .map(status -> {
    //                 status.setTitle(statusDetails.getTitle());
    //                 status.setContent(statusDetails.getContent());
    //                 status.setProgressTemplate(statusDetails.getProgressTemplate());
    //                 status.setDate(statusDetails.getDate());
    //                 StatusModel updatedStatus = statusRepository.save(status);
    //                 return ResponseEntity.ok(updatedStatus);
    //             })
    //             .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    // }

    // // Delete a status
    // @DeleteMapping("/status/{id}")
    // public ResponseEntity<Map<String, String>> deleteStatus(@PathVariable Long id) {
    //     return statusRepository.findById(id)
    //             .map(status -> {
    //                 statusRepository.delete(status);
    //                 return ResponseEntity.ok(Map.of("message", "Status deleted successfully"));
    //             })
    //             .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Status not found")));
    // }


    


    // simple crud
// Create new status
@PostMapping("/status")
public StatusModel createStatus(@RequestBody StatusModel status) {
    return statusRepository.save(status);
}

// Get all statuses for a user
@GetMapping("/status/user/{userId}")
public List<StatusModel> getStatusesByUserId(@PathVariable Long userId) {
    return statusRepository.findByUserId(userId);
}


// Get a single status by ID
@GetMapping("/status/{id}")
public StatusModel getStatusById(@PathVariable Long id) {
    return statusRepository.findById(id).orElse(null);
}

// Update a status
@PutMapping("/status/{id}")
public StatusModel updateStatus(@PathVariable Long id, @RequestBody StatusModel updatedStatus) {
    return statusRepository.findById(id)
            .map(status -> {
                status.setTitle(updatedStatus.getTitle());
                status.setContent(updatedStatus.getContent());
                status.setProgressTemplate(updatedStatus.getProgressTemplate());
                status.setDate(updatedStatus.getDate());
                return statusRepository.save(status);
            })
            .orElse(null);
}

// Delete a status
@DeleteMapping("/status/{id}")
public void deleteStatus(@PathVariable Long id) {
    statusRepository.deleteById(id);
}
}
