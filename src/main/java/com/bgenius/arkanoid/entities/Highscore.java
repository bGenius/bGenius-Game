package com.bgenius.arkanoid.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * Jpa entity for keeping highscores
 */
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "highscores")
public class Highscore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // For auditing we keep track of the date and time of creation
    @Column(name = "date_created")
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    /*
     Eighth Assignment:
     Add fields to the Highscore entity for the database columns "player_name" (db:varchar/java:string)
     and "score" (db:bigint/java:long)

     After adding the field, please make sure these fields have public getters and setters

     Hint:
     Keep in mind that the naming convention for database columns (snake case) differs from java convention (camelCase)
     The @Column annotation can be used to specify the name of a database column
     */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

}
