package com.ydrozdov.doodle.db.repositories;

import com.ydrozdov.doodle.db.entities.MessageEntity;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<MessageEntity, Integer> {
}
