package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/Inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {
        return inventoryRepository.save(newInventoryModel);
    }

    @PostMapping("inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "C:/Users/sumet/Desktop/project/spring-crud/spring-CRUD/pto/";
        String itemImage = file.getOriginalFilename();
        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
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
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{id}")
    public InventoryModel getItemId(@PathVariable Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    private final String UPLOAD_DIR = "C:/Users/sumet/Desktop/project/spring-crud/spring-CRUD/pto/";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    @PutMapping("/inventory/{id}")
    public InventoryModel updateItem(
            @RequestPart(value = "itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id) {
        ObjectMapper mapper = new ObjectMapper();
        InventoryModel newInventory;
        try {
            newInventory = mapper.readValue(itemDetails, InventoryModel.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing itemDetails", e);
        }
        return inventoryRepository.findById(id).map(existingInventory -> {
            existingInventory.setItemId(newInventory.getItemId());
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setItemQty(newInventory.getItemQty());
            existingInventory.setItemDetails(newInventory.getItemDetails());
            if (file != null && !file.isEmpty()) {
                String folder = "C:/Users/sumet/Desktop/project/spring-crud/spring-CRUD/pto/";
                String itemImage = file.getOriginalFilename();
                try {
                    file.transferTo(Paths.get(folder + itemImage));
                    existingInventory.setItemImage(itemImage);
                } catch (IOException e) {
                    throw new RuntimeException("Error uploading file", e);
                }
            }
            return inventoryRepository.save(existingInventory);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    @DeleteMapping("/inventory/{id}")
    public String deleteItem(@PathVariable Long id) {
        InventoryModel inventoryItem = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
        String itemImage = inventoryItem.getItemImage();
        if (itemImage != null && !itemImage.isEmpty()) {
            File imageFile = new File(UPLOAD_DIR + itemImage);
            if (imageFile.exists()) {
                imageFile.delete();
            }
        }
        inventoryRepository.deleteById(id);
        return "Item " + id + " and image deleted successfully";
    }

    // New endpoint to increment the like count for an item
    @PostMapping("/inventory/{id}/like")
    public InventoryModel likeItem(@PathVariable Long id) {
        return inventoryRepository.findById(id).map(item -> {
            item.setLikeCount(item.getLikeCount() + 1);
            return inventoryRepository.save(item);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    // New endpoint to add a comment to an item
    @PostMapping("/inventory/{id}/comment")
    public InventoryModel addComment(@PathVariable Long id, @RequestParam String comment) {
        return inventoryRepository.findById(id).map(item -> {
            item.getComments().add(comment);
            return inventoryRepository.save(item);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }
}