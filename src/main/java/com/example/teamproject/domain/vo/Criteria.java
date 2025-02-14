package com.example.teamproject.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;


@Component
@Data
@AllArgsConstructor

public class Criteria {

    private int pageNum;
    private int amount;
    private String type;
    private String keyword;


    public Criteria() {
        this(1, 12);
    }

    public Criteria(int pageNum, int amount) {
        this.pageNum = pageNum;
        this.amount = amount;
    }

    public String getListLink(){
        UriComponentsBuilder builder = UriComponentsBuilder.fromPath("")
                .queryParam("pageNum", this.pageNum)
                .queryParam("amount", this.amount)
                .queryParam("type", this.type)
                .queryParam("keyword", this.keyword);

        return builder.toUriString();
    }

    public String[] getTypes(){
        return type == null ? new String[] {} : type.split("");
    }
}
