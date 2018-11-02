package com.ydrozdov.doodle;

import com.ydrozdov.doodle.db.entities.MessageEntity;
import com.ydrozdov.doodle.domain.dto.MessageDTO;
import com.ydrozdov.doodle.services.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private ModelMapper modelMapper;

    @MessageMapping("/send")
    @SendTo("/topic/public")
    public MessageDTO broadcast(MessageDTO messageDTO) throws Exception {
        messageDTO.setCreated(LocalDateTime.now());
        MessageEntity messageEntity = modelMapper.map(messageDTO, MessageEntity.class);
        messageService.addMessage(messageEntity);

        return messageDTO;
    }

    @MessageMapping("/getall")
    @SendTo("/topic/archive")
    public Iterable<MessageEntity> getAll() throws Exception {
        return messageService.getAll();
    }
}
