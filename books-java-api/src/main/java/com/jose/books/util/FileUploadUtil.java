package com.jose.books.util;

import java.io.*;
import java.nio.file.*;
import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {

    private FileUploadUtil() {
    }

    public static void saveFile(String uploadDir, String fileName,
            MultipartFile multipartFile) throws IOException {

        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        InputStream inputStream = multipartFile.getInputStream();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

    }

}
