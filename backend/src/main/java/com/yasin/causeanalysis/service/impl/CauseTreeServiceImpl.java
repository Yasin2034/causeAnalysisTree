package com.yasin.causeanalysis.service.impl;

import org.springframework.stereotype.Service;

import com.yasin.causeanalysis.entity.CauseTree;
import com.yasin.causeanalysis.exception.CauseTreeNotFoundException;
import com.yasin.causeanalysis.repository.CauseTreeRepository;
import com.yasin.causeanalysis.service.CauseTreeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CauseTreeServiceImpl implements CauseTreeService {

	private final CauseTreeRepository causeTreeRepository;

	@Override
	public CauseTree save(CauseTree causeTree) {
		return causeTreeRepository.save(causeTree);
	}

	@Override
	public CauseTree updateById(Long id, CauseTree causeTree) {
		boolean isExist = causeTreeRepository.existsById(id);
		if (!isExist)
			throw new CauseTreeNotFoundException("Cause tree not found with id:" + id);
		return causeTreeRepository.save(causeTree);
	}

	@Override
	public void deleteById(Long id) {
		causeTreeRepository.deleteById(id);
	}

	@Override
	public CauseTree findById(Long id) {
		return causeTreeRepository.findById(id)
				.orElseThrow(() -> new CauseTreeNotFoundException("Cause tree not found with id:" + id));
	}

}
