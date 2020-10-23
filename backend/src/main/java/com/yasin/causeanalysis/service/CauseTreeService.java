package com.yasin.causeanalysis.service;

import com.yasin.causeanalysis.entity.CauseTree;

public interface CauseTreeService {
	
	CauseTree save(CauseTree causeTree);
	
	CauseTree updateById(Long id, CauseTree causeTree);
	
	void deleteById(Long id);
	
	CauseTree findById(Long id);

}
