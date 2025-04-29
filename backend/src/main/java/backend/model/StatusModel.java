package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class StatusModel {

    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String progressTemplate;
    private String date;

    public StatusModel() {
    }

    public StatusModel(Long userId, String title, String content, String progressTemplate, String date) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.progressTemplate = progressTemplate;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getProgressTemplate() {
        return progressTemplate;
    }

    public void setProgressTemplate(String progressTemplate) {
        this.progressTemplate = progressTemplate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
