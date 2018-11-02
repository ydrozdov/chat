package com.ydrozdov.doodle.services;

import com.ydrozdov.doodle.db.entities.MessageEntity;
import com.ydrozdov.doodle.db.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public int addMessage(MessageEntity messageEntity) {
        return messageRepository.save(messageEntity).getId();
    }

    public Iterable<MessageEntity> getAll() {
        return messageRepository.findAll();
    }
}
