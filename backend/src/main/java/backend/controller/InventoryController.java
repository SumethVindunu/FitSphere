package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import org.springframework.core.io.FileSystemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping("/")
    public String rootMap() {
        String message = "Hello World";
        return message;
    }

    @GetMapping("/hello")
    public String helloEndpoint(@RequestParam(value = "name", defaultValue = "World") String name) {
        return "Hello, " + name + "!";
    }

    @GetMapping("/greet")
    public String greet() {
        return "Welcome to Spring Boot!";
    }


    @GetMapping("/greet/{name}")
public String greetWithCustomMessage(
        @PathVariable String name,
        @RequestParam(value = "message", required = false) String message) {

    if (message == null || message.isEmpty()) {
        message = "Welcome to Spring Boot!";
    }

    return "Hello " + name + "! " + message;
}






    @PostMapping("/Inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {

        return inventoryRepository.save(newInventoryModel);

    }

    @PostMapping("inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "src/main/uploads/";
        String itemImage = file.getOriginalFilename();

        try {
            File uplodDir = new File(folder);
            if (!uplodDir.exists()) {
                uplodDir.mkdir();
            }
            file.transferTo(Paths.get(folder + itemImage));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + itemImage;
        }
        return itemImage;
    }

    @GetMapping("/inventory")

    public List<InventoryModel> getAllItems() {
        List<InventoryModel> items = inventoryRepository.findAll();
        return items; // Ensure proper serialization
    }

    @GetMapping("/inventory/{id}")
    InventoryModel getItemId(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    private final String UPLOAD_DIR = "src/main/uploads/";

    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        System.out.println("Requesting image: " + filename); // Log the requested filename

        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            System.out.println("File not found: " + filename); // Log if the file does not exist

            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }
}
