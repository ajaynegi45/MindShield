import React from 'react';
import JournalItem from './JournalItem'; // Import JournalItem component

const JournalList = ({ journals, onDeleteJournal, onEditJournal, onSortChange }) => {
  return (
    <div>
      {/* Header with title on the left and sort dropdown on the right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          background:'white' 
        }}
      >
        <h2 style={{ margin: 0, color: '#333',background:'white'}}>All Journals</h2>

        {/* Sort by dropdown inside a container */}
        <div style={{ display: 'inline-block' }}>
          <label htmlFor="sortBy" style={{ fontSize: '20px', marginRight: '10px', background:'white'}}>Sort By</label>
          <select
            id="sortBy"
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '5px 10px',
              fontSize: '17px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Journals Grid */}
      <div
        style={{
          background:'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
          gap: '20px', // Space between grid items
        }}
      >
        {/* Journals List */}
        {journals.length > 0 ? (
          journals.map((journal) => (
            <JournalItem
              key={journal.id}
              journal={journal}
              onDeleteJournal={onDeleteJournal}
              onEditJournal={onEditJournal}
            />
          ))
        ) : (
          <p>No journals available.</p>
        )}
      </div>
    </div>
  );
};

export default JournalList;
