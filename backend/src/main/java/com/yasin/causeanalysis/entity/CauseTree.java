package com.yasin.causeanalysis.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CauseTree {

	
	@Id
	@GeneratedValue
	private Long id;
	
	@NotBlank
	private String name;
	
	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinTable(name="children_list")
	private List<CauseTree> children = new ArrayList<>();
	
	
	
	
	
	
	
}
