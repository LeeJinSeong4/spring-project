package com.example.teamproject.mapper;


import com.example.teamproject.domain.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    public void insert(BoardVO boardVO);
    public int update(BoardVO boardVO);
    public BoardVO get(Long bno);
    public int delete(Long bno);
    public int getTotal();






}
