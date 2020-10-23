package com.yasin.causeanalysis.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yasin.causeanalysis.entity.CauseTree;
import com.yasin.causeanalysis.service.CauseTreeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CauseTreeController {
	
	private final CauseTreeService causeTreeService;
	
	@PostMapping
	public ResponseEntity<CauseTree> save(@Valid @RequestBody CauseTree causeTree){
		CauseTree saved = causeTreeService.save(causeTree);
		return ResponseEntity.ok(saved);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<CauseTree> save(@PathVariable Long id,@Valid @RequestBody CauseTree causeTree){
		CauseTree saved = causeTreeService.updateById(id,causeTree);
		return ResponseEntity.ok(saved);
	}
	

	@GetMapping("/{id}")
	public ResponseEntity<CauseTree> save(@PathVariable Long id){
		CauseTree causeTree = causeTreeService.findById(id);
		return ResponseEntity.ok(causeTree);
	}
	
	
	@DeleteMapping("/{id}")
	public void deleteById(Long id) {
		causeTreeService.deleteById(id);
	}
	

}
